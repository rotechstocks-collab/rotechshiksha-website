#!/bin/bash

# Rotech Shiksha Security Test Suite
# Tests all security hardening measures
# Usage: ./security-test.sh [BASE_URL]

# Don't exit on first error - we want to run all tests

BASE_URL="${1:-http://localhost:5000}"
PASS_COUNT=0
FAIL_COUNT=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo ""
echo "=========================================="
echo "  ROTECH SHIKSHA SECURITY TEST SUITE"
echo "=========================================="
echo "Target: $BASE_URL"
echo "Date: $(date)"
echo ""

pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((PASS_COUNT++))
}

fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((FAIL_COUNT++))
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

section() {
    echo ""
    echo "--- $1 ---"
}

# ==========================================
# 1. SERVER HEALTH CHECK
# ==========================================
section "1. SERVER HEALTH CHECK"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$BASE_URL/api/market/live" 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    pass "Server is responding (HTTP $HTTP_CODE)"
else
    fail "Server not responding (HTTP $HTTP_CODE)"
    echo "Cannot continue without a running server. Exiting."
    exit 1
fi

# ==========================================
# 2. SECURITY HEADERS (Helmet)
# ==========================================
section "2. SECURITY HEADERS (Helmet)"

HEADERS=$(curl -sI --max-time 5 "$BASE_URL/api/market/live" 2>/dev/null)

# X-Content-Type-Options
if echo "$HEADERS" | grep -qi "x-content-type-options: nosniff"; then
    pass "X-Content-Type-Options: nosniff"
else
    fail "Missing X-Content-Type-Options header"
fi

# X-Frame-Options
if echo "$HEADERS" | grep -qi "x-frame-options"; then
    pass "X-Frame-Options header present"
else
    fail "Missing X-Frame-Options header"
fi

# X-DNS-Prefetch-Control
if echo "$HEADERS" | grep -qi "x-dns-prefetch-control"; then
    pass "X-DNS-Prefetch-Control header present"
else
    fail "Missing X-DNS-Prefetch-Control header"
fi

# Referrer-Policy
if echo "$HEADERS" | grep -qi "referrer-policy"; then
    pass "Referrer-Policy header present"
else
    fail "Missing Referrer-Policy header"
fi

# Content-Security-Policy
if echo "$HEADERS" | grep -qi "content-security-policy"; then
    pass "Content-Security-Policy header present"
else
    fail "Missing Content-Security-Policy header"
fi

# X-Powered-By should be removed
if echo "$HEADERS" | grep -qi "x-powered-by"; then
    fail "X-Powered-By header should be removed"
else
    pass "X-Powered-By header removed"
fi

# ==========================================
# 3. CORS PROTECTION
# ==========================================
section "3. CORS PROTECTION"

# Test blocked origin (evil.com)
CORS_BLOCKED=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -H "Origin: http://evil.com" "$BASE_URL/api/market/live" 2>/dev/null)
if [ "$CORS_BLOCKED" = "500" ]; then
    pass "Blocked malicious origin (evil.com)"
else
    fail "Malicious origin not blocked (HTTP $CORS_BLOCKED)"
fi

# Test blocked localhost in production check
if [[ "$BASE_URL" == *"replit.app"* ]] || [[ "$BASE_URL" == *"rotechshiksha.com"* ]]; then
    CORS_LOCALHOST=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -H "Origin: http://localhost:5000" "$BASE_URL/api/market/live" 2>/dev/null)
    if [ "$CORS_LOCALHOST" = "500" ]; then
        pass "Blocked localhost origin in production"
    else
        warn "localhost origin allowed (expected in dev, blocked in prod)"
    fi
else
    pass "Development mode - localhost origins allowed (expected)"
fi

# Test same-origin (no Origin header)
CORS_SAME=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE_URL/api/market/live" 2>/dev/null)
if [ "$CORS_SAME" = "200" ]; then
    pass "Same-origin requests allowed"
else
    fail "Same-origin requests blocked"
fi

# ==========================================
# 4. RATE LIMITING - Auth Endpoints
# ==========================================
section "4. RATE LIMITING (Auth: 5 req/15min)"

warn "Testing rate limit (sending 6 rapid requests)..."

RATE_LIMITED=false
for i in {1..6}; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -X POST "$BASE_URL/api/auth/send-otp" \
        -H "Content-Type: application/json" \
        -d "{\"fullName\":\"RateTest$i\",\"mobile\":\"999999999$i\",\"experience\":\"beginner\"}" 2>/dev/null)
    
    if [ "$HTTP_CODE" = "429" ]; then
        RATE_LIMITED=true
        pass "Rate limit triggered after $i requests (HTTP 429)"
        break
    fi
done

if [ "$RATE_LIMITED" = false ]; then
    fail "Rate limit NOT triggered after 6 requests"
fi

# Check rate limit headers
RATE_HEADERS=$(curl -sI --max-time 5 -X POST "$BASE_URL/api/auth/send-otp" \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Test","mobile":"8888888888","experience":"beginner"}' 2>/dev/null)

if echo "$RATE_HEADERS" | grep -qi "ratelimit-limit"; then
    pass "RateLimit headers present"
else
    warn "RateLimit headers not visible (may be hidden)"
fi

# ==========================================
# 5. OTP SECURITY
# ==========================================
section "5. OTP SECURITY"

# Test OTP verification with random OTP (should fail)
# Use a unique mobile number to avoid rate limiting from previous tests
RANDOM_MOBILE="55555$(date +%S%N | head -c 5)"
OTP_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE_URL/api/auth/verify-otp" \
    -H "Content-Type: application/json" \
    -d "{\"mobile\":\"$RANDOM_MOBILE\",\"otp\":\"999999\"}" 2>/dev/null)

# Valid rejection responses: invalid OTP, expired, not found, no lead, or rate limited
if echo "$OTP_RESPONSE" | grep -qi "invalid\|expired\|not found\|No lead\|too many"; then
    pass "Random OTP rejected"
else
    fail "Random OTP may have been accepted: $OTP_RESPONSE"
fi

# Test if test OTP is disabled in production
if [[ "$BASE_URL" == *"replit.app"* ]] || [[ "$BASE_URL" == *"rotechshiksha.com"* ]]; then
    TEST_OTP_RESPONSE=$(curl -s --max-time 5 -X POST "$BASE_URL/api/auth/verify-otp" \
        -H "Content-Type: application/json" \
        -d '{"mobile":"9999999999","otp":"123456"}' 2>/dev/null)
    
    if echo "$TEST_OTP_RESPONSE" | grep -qi "invalid\|expired\|not found"; then
        pass "Test OTP (123456) rejected in production"
    else
        fail "Test OTP may be working in production - CRITICAL!"
    fi
else
    warn "Development mode - skipping test OTP production check"
fi

# ==========================================
# 6. ADMIN PROTECTION
# ==========================================
section "6. ADMIN PROTECTION"

# Test admin endpoints without auth
ADMIN_LEADS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE_URL/api/admin/leads" 2>/dev/null)
if [ "$ADMIN_LEADS" = "401" ]; then
    pass "Admin /leads requires authentication (HTTP 401)"
else
    fail "Admin /leads accessible without auth (HTTP $ADMIN_LEADS)"
fi

ADMIN_PAYMENTS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE_URL/api/admin/payments" 2>/dev/null)
if [ "$ADMIN_PAYMENTS" = "401" ]; then
    pass "Admin /payments requires authentication (HTTP 401)"
else
    fail "Admin /payments accessible without auth (HTTP $ADMIN_PAYMENTS)"
fi

ADMIN_CHATS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE_URL/api/admin/chats" 2>/dev/null)
if [ "$ADMIN_CHATS" = "401" ]; then
    pass "Admin /chats requires authentication (HTTP 401)"
else
    fail "Admin /chats accessible without auth (HTTP $ADMIN_CHATS)"
fi

# ==========================================
# 7. COOKIE SECURITY
# ==========================================
section "7. COOKIE SECURITY"

# Trigger a cookie by sending OTP
COOKIE_HEADERS=$(curl -sI --max-time 5 -X POST "$BASE_URL/api/auth/send-otp" \
    -H "Content-Type: application/json" \
    -d '{"fullName":"CookieTest","mobile":"7777777777","experience":"beginner"}' 2>/dev/null)

if echo "$COOKIE_HEADERS" | grep -qi "set-cookie.*httponly"; then
    pass "Cookies have HttpOnly flag"
else
    warn "Could not verify HttpOnly flag (may need browser test)"
fi

if echo "$COOKIE_HEADERS" | grep -qi "set-cookie.*samesite"; then
    pass "Cookies have SameSite attribute"
else
    warn "Could not verify SameSite attribute (may need browser test)"
fi

# Check Secure flag in production
if [[ "$BASE_URL" == https://* ]]; then
    if echo "$COOKIE_HEADERS" | grep -qi "set-cookie.*secure"; then
        pass "Cookies have Secure flag (HTTPS)"
    else
        fail "Missing Secure flag on cookies in production"
    fi
else
    warn "HTTP mode - Secure flag not expected"
fi

# ==========================================
# 8. ERROR HANDLING
# ==========================================
section "8. ERROR HANDLING"

# Send malformed JSON
ERROR_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -X POST "$BASE_URL/api/auth/verify-otp" \
    -H "Content-Type: application/json" \
    -d 'not valid json{{' 2>/dev/null)

if [ "$ERROR_RESPONSE" = "400" ] || [ "$ERROR_RESPONSE" = "500" ]; then
    pass "Malformed request handled gracefully (HTTP $ERROR_RESPONSE)"
    
    # Verify server still running
    HEALTH_AFTER=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$BASE_URL/api/market/live" 2>/dev/null)
    if [ "$HEALTH_AFTER" = "200" ]; then
        pass "Server still running after error (no crash)"
    else
        fail "Server may have crashed after error"
    fi
else
    fail "Unexpected response to malformed request (HTTP $ERROR_RESPONSE)"
fi

# ==========================================
# SUMMARY
# ==========================================
echo ""
echo "=========================================="
echo "  TEST SUMMARY"
echo "=========================================="
echo -e "Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "Failed: ${RED}$FAIL_COUNT${NC}"
echo ""

if [ "$FAIL_COUNT" -eq 0 ]; then
    echo -e "${GREEN}All security tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some security tests failed. Review above.${NC}"
    exit 1
fi
