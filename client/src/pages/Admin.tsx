import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  CreditCard,
  MessageCircle,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
  Filter,
  RefreshCw,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "unverified">("all");

  const { data: leads = [], refetch: refetchLeads } = useQuery({
    queryKey: ["/api/admin/leads"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const { data: payments = [], refetch: refetchPayments } = useQuery({
    queryKey: ["/api/admin/payments"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const { data: chatMessages = [] } = useQuery({
    queryKey: ["/api/admin/chats"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const { data: startups = [], refetch: refetchStartups } = useQuery({
    queryKey: ["/api/admin/startups"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const { data: investors = [], refetch: refetchInvestors } = useQuery({
    queryKey: ["/api/admin/investors"],
    enabled: isAuthenticated && user?.isAdmin,
  });

  const approvePaymentMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      return apiRequest("PATCH", `/api/admin/payments/${paymentId}/approve`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payments"] });
      toast({ title: "Payment approved successfully" });
    },
  });

  const rejectPaymentMutation = useMutation({
    mutationFn: async (paymentId: string) => {
      return apiRequest("PATCH", `/api/admin/payments/${paymentId}/reject`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/payments"] });
      toast({ title: "Payment rejected" });
    },
  });

  const updateStartupStatusMutation = useMutation({
    mutationFn: async ({ startupId, status }: { startupId: number; status: string }) => {
      return apiRequest("PATCH", `/api/admin/startups/${startupId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/startups"] });
      toast({ title: "Startup status updated" });
    },
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, user, setLocation]);

  if (isLoading || !isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const filteredLeads = Array.isArray(leads)
    ? leads.filter((lead: any) => {
        const matchesSearch =
          lead.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.mobile?.includes(searchTerm) ||
          lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
          filterVerified === "all" ||
          (filterVerified === "verified" && lead.isVerified) ||
          (filterVerified === "unverified" && !lead.isVerified);
        return matchesSearch && matchesFilter;
      })
    : [];

  const verifiedLeads = Array.isArray(leads) ? leads.filter((l: any) => l.isVerified).length : 0;
  const pendingPayments = Array.isArray(payments)
    ? payments.filter((p: any) => p.status === "pending").length
    : 0;

  const exportLeads = () => {
    const csv = [
      ["Name", "Mobile", "Email", "Experience", "Investment Range", "Verified", "Date"],
      ...filteredLeads.map((lead: any) => [
        lead.fullName,
        lead.mobile,
        lead.email || "",
        lead.experience,
        lead.investmentRange || "",
        lead.isVerified ? "Yes" : "No",
        new Date(lead.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-28">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">Manage leads, payments, and content</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Array.isArray(leads) ? leads.length : 0}</div>
                    <div className="text-sm text-muted-foreground">Total Leads</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{verifiedLeads}</div>
                    <div className="text-sm text-muted-foreground">Verified Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/10">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{pendingPayments}</div>
                    <div className="text-sm text-muted-foreground">Pending Payments</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Array.isArray(chatMessages) ? chatMessages.length : 0}</div>
                    <div className="text-sm text-muted-foreground">Chat Messages</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList className="flex-wrap">
              <TabsTrigger value="leads">
                <Users className="w-4 h-4 mr-2" />
                Leads
              </TabsTrigger>
              <TabsTrigger value="payments">
                <CreditCard className="w-4 h-4 mr-2" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="chats">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chats
              </TabsTrigger>
              <TabsTrigger value="startups">
                <Rocket className="w-4 h-4 mr-2" />
                Startups
              </TabsTrigger>
              <TabsTrigger value="investors">
                <TrendingUp className="w-4 h-4 mr-2" />
                Investors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leads">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Lead Management</CardTitle>
                      <CardDescription>View and manage all captured leads</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetchLeads()}
                        data-testid="button-refresh-leads"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exportLeads}
                        data-testid="button-export-leads"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, mobile, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        data-testid="input-search-leads"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filterVerified === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterVerified("all")}
                      >
                        All
                      </Button>
                      <Button
                        variant={filterVerified === "verified" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterVerified("verified")}
                      >
                        Verified
                      </Button>
                      <Button
                        variant={filterVerified === "unverified" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterVerified("unverified")}
                      >
                        Unverified
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No leads found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLeads.map((lead: any) => (
                            <TableRow key={lead.id}>
                              <TableCell className="font-medium">{lead.fullName}</TableCell>
                              <TableCell>{lead.mobile}</TableCell>
                              <TableCell>{lead.email || "-"}</TableCell>
                              <TableCell className="capitalize">{lead.experience}</TableCell>
                              <TableCell>
                                {lead.isVerified ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                                    Verified
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary">Pending</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Management</CardTitle>
                  <CardDescription>Approve or reject payment requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Plan</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Screenshot</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!Array.isArray(payments) || payments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No payments found
                            </TableCell>
                          </TableRow>
                        ) : (
                          payments.map((payment: any) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.userId.slice(0, 8)}...</TableCell>
                              <TableCell className="capitalize">{payment.planId}</TableCell>
                              <TableCell>₹{payment.amount}</TableCell>
                              <TableCell>
                                {payment.screenshotUrl?.startsWith("data:image") ? (
                                  <a
                                    href={payment.screenshotUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-16 h-12 rounded overflow-hidden border hover:ring-2 ring-primary transition-all"
                                  >
                                    <img
                                      src={payment.screenshotUrl}
                                      alt="Payment proof"
                                      className="w-full h-full object-cover"
                                    />
                                  </a>
                                ) : (
                                  <span className="text-xs text-muted-foreground">No image</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {payment.status === "approved" && (
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-0">
                                    Approved
                                  </Badge>
                                )}
                                {payment.status === "pending" && (
                                  <Badge className="bg-amber-500/10 text-amber-600 border-0">
                                    Pending
                                  </Badge>
                                )}
                                {payment.status === "rejected" && (
                                  <Badge className="bg-red-500/10 text-red-600 border-0">
                                    Rejected
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {new Date(payment.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {payment.status === "pending" && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-emerald-600"
                                      onClick={() => approvePaymentMutation.mutate(payment.id)}
                                      data-testid={`button-approve-${payment.id}`}
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600"
                                      onClick={() => rejectPaymentMutation.mutate(payment.id)}
                                      data-testid={`button-reject-${payment.id}`}
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chats">
              <Card>
                <CardHeader>
                  <CardTitle>Chat Messages</CardTitle>
                  <CardDescription>View and respond to user messages</CardDescription>
                </CardHeader>
                <CardContent>
                  {!Array.isArray(chatMessages) || chatMessages.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No chat messages yet
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg: any) => (
                        <div key={msg.id} className="p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {msg.isAdmin ? "Admin" : `Session: ${msg.sessionId.slice(0, 8)}...`}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="startups">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Startup Management</CardTitle>
                      <CardDescription>Review and approve startup listings</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchStartups()}
                      data-testid="button-refresh-startups"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startup Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Funding</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!Array.isArray(startups) || startups.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                              No startups found
                            </TableCell>
                          </TableRow>
                        ) : (
                          startups.map((startup: any) => (
                            <TableRow key={startup.id}>
                              <TableCell className="font-medium">{startup.startupName}</TableCell>
                              <TableCell className="capitalize">{startup.category}</TableCell>
                              <TableCell>{startup.fundingRequired}</TableCell>
                              <TableCell>
                                {startup.status === "live" && (
                                  <Badge className="bg-emerald-500/10 text-emerald-600 border-0">Live</Badge>
                                )}
                                {startup.status === "under_review" && (
                                  <Badge className="bg-amber-500/10 text-amber-600 border-0">Under Review</Badge>
                                )}
                                {startup.status === "rejected" && (
                                  <Badge className="bg-red-500/10 text-red-600 border-0">Rejected</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {startup.createdAt ? new Date(startup.createdAt).toLocaleDateString() : '-'}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={startup.status}
                                  onValueChange={(value) => 
                                    updateStartupStatusMutation.mutate({ startupId: startup.id, status: value })
                                  }
                                >
                                  <SelectTrigger className="w-32" data-testid={`select-status-${startup.id}`}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="under_review">Under Review</SelectItem>
                                    <SelectItem value="live">Live</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investors">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle>Investor Management</CardTitle>
                      <CardDescription>View registered investors and their interests</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => refetchInvestors()}
                      data-testid="button-refresh-investors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Investment Range</TableHead>
                          <TableHead>Sectors</TableHead>
                          <TableHead>Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!Array.isArray(investors) || investors.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No investors found
                            </TableCell>
                          </TableRow>
                        ) : (
                          investors.map((investor: any) => (
                            <TableRow key={investor.id}>
                              <TableCell className="font-medium">{investor.fullName}</TableCell>
                              <TableCell>{investor.email}</TableCell>
                              <TableCell>{investor.phone}</TableCell>
                              <TableCell className="capitalize">{investor.investorType?.replace('_', ' ')}</TableCell>
                              <TableCell>{investor.investmentRange}</TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {investor.sectorsOfInterest?.slice(0, 2).map((sector: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {sector}
                                    </Badge>
                                  ))}
                                  {investor.sectorsOfInterest?.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{investor.sectorsOfInterest.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                {investor.createdAt ? new Date(investor.createdAt).toLocaleDateString() : '-'}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
