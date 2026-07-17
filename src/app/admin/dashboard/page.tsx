"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  MessageCircle, 
  Users, 
  LogOut,
  RefreshCw,
  Search,
  X,
  Trash2,
  Eye,
  CheckCircle,
  Circle,
  Clock
} from "lucide-react";
import { getLeads, updateLeadStatus, deleteLead } from "../../../lib/appwrite/server";
import type { Lead } from "../../../lib/appwrite/collections";
import { account } from "../../../lib/appwrite/client";
import { toast } from "sonner";

type LeadStatus = "new" | "contacted" | "converted" | "archived";

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-[#000000] text-[#F5F5F7]",
  contacted: "bg-[#4A6CF7] text-[#FFFFFF]",
  converted: "bg-[#10B981] text-[#FFFFFF]",
  archived: "bg-[#8A8A8A] text-[#FFFFFF]",
};

const ALLOWED_EMAILS = [
  "slatif200426@gmail.com",
  "thelateefco@gmail.com",
];

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  converted: "Converted",
  archived: "Archived",
};

const TYPE_ICONS: Record<string, any> = {
  form: Mail,
  whatsapp: MessageCircle,
  email: Mail,
  whatsapp_click: MessageCircle,
  email_click: Mail,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check authentication using Appwrite session
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await account.get();
        if (!session || !ALLOWED_EMAILS.includes(session.email)) {
          router.replace("/admin/login");
          return;
        }
        setIsCheckingAuth(false);
        fetchLeads();
      } catch {
        router.replace("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const result = await getLeads();
      if (result.success && result.data) {
        setLeads(result.data);
      } else {
        toast.error(result.error || "Failed to fetch leads");
      }
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      toast.error(error?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingStatus(true);
    try {
      const result = await updateLeadStatus(leadId, newStatus);
      if (result.success) {
        setLeads(prev => 
          prev.map(lead => 
            lead.$id === leadId 
              ? { ...lead, status: newStatus }
              : lead
          )
        );
        if (selectedLead && selectedLead.$id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        toast.success(`Lead marked as ${STATUS_LABELS[newStatus]}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteLead(leadId);
      if (result.success) {
        setLeads(prev => prev.filter(lead => lead.$id !== leadId));
        if (selectedLead && selectedLead.$id === leadId) {
          setSelectedLead(null);
        }
        toast.success("Lead deleted successfully");
      } else {
        toast.error("Failed to delete lead");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch {
      // Ignore
    }
    sessionStorage.removeItem("adminLoggedIn");
    sessionStorage.removeItem("adminEmail");
    sessionStorage.removeItem("adminName");
    router.push("/");
  };

  const getTypeIcon = (type: string) => {
    return TYPE_ICONS[type] || Mail;
  };

  const getStatusColor = (status: string) => {
    return STATUS_COLORS[status as LeadStatus] || STATUS_COLORS.new;
  };

  const getStatusLabel = (status: string) => {
    return STATUS_LABELS[status as LeadStatus] || status;
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.business?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === "new").length,
    contacted: leads.filter(l => l.status === "contacted").length,
    converted: leads.filter(l => l.status === "converted").length,
    archived: leads.filter(l => l.status === "archived").length,
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#000000] border-t-transparent rounded-full animate-spin" />
          <span className="label text-[#8A8A8A]">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-[2rem] font-medium text-[#000000]">
              Dashboard
            </h1>
            <p className="text-[0.875rem] text-[#8A8A8A] font-light">
              Manage and track your leads
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-4 py-2 rounded-[7px] transition-colors duration-300 ease-out border border-[#E8E8EC] bg-[#FFFFFF] text-[#000000] hover:bg-[#F5F5F7] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-4 py-2 rounded-[7px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-5">
            <div className="flex items-center justify-between">
              <span className="label text-[0.5rem] text-[#8A8A8A]">Total Leads</span>
              <Users className="w-4 h-4 text-[#8A8A8A]" />
            </div>
            <p className="font-serif text-[1.75rem] font-medium text-[#000000] mt-1">
              {stats.total}
            </p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-5">
            <div className="flex items-center justify-between">
              <span className="label text-[0.5rem] text-[#8A8A8A]">New</span>
              <span className="w-2 h-2 rounded-full bg-[#000000]" />
            </div>
            <p className="font-serif text-[1.75rem] font-medium text-[#000000] mt-1">
              {stats.new}
            </p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-5">
            <div className="flex items-center justify-between">
              <span className="label text-[0.5rem] text-[#8A8A8A]">Contacted</span>
              <span className="w-2 h-2 rounded-full bg-[#4A6CF7]" />
            </div>
            <p className="font-serif text-[1.75rem] font-medium text-[#000000] mt-1">
              {stats.contacted}
            </p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-5">
            <div className="flex items-center justify-between">
              <span className="label text-[0.5rem] text-[#8A8A8A]">Converted</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </div>
            <p className="font-serif text-[1.75rem] font-medium text-[#000000] mt-1">
              {stats.converted}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["all", "new", "contacted", "converted", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-[7px] text-[0.75rem] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                  filterStatus === status
                    ? "bg-[#000000] text-[#F5F5F7]"
                    : "bg-[#FFFFFF] border border-[#E8E8EC] text-[#4A4A4A] hover:bg-[#F5F5F7]"
                }`}
              >
                {status === "all" ? "All" : getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-8 text-center">
            <div className="inline-block w-8 h-8 border-2 border-[#000000] border-t-transparent rounded-full animate-spin" />
            <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-3">
              Loading leads...
            </p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] p-12 text-center">
            <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#8A8A8A]" />
            </div>
            <p className="font-serif text-[1.25rem] font-medium text-[#000000]">
              No leads found
            </p>
            <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-1">
              {searchQuery ? "Try adjusting your search" : "Leads will appear here when they come in"}
            </p>
          </div>
        ) : (
          <div className="bg-[#FFFFFF] border border-[#E8E8EC] rounded-[6px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E8EC]">
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Type</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Name</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Business</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Email</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Message</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Status</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Date</th>
                    <th className="text-left py-3 px-4 label text-[0.5rem] text-[#8A8A8A]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => {
                    const Icon = getTypeIcon(lead.type || "form");
                    return (
                      <tr
                        key={lead.$id}
                        className="border-b border-[#F5F5F7] hover:bg-[#F5F5F7]/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <Icon className="w-4 h-4 text-[#8A8A8A]" />
                        </td>
                        <td className="py-3 px-4 text-[0.875rem] font-light text-[#000000]">
                          {lead.name || "-"}
                        </td>
                        <td className="py-3 px-4 text-[0.875rem] font-light text-[#000000]">
                          {lead.business || "-"}
                        </td>
                        <td className="py-3 px-4 text-[0.875rem] font-light text-[#000000]">
                          {lead.email || "-"}
                        </td>
                        <td className="py-3 px-4 text-[0.875rem] font-light text-[#8A8A8A] max-w-[200px] truncate">
                          {lead.message || "-"}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-[0.6rem] font-medium tracking-[0.06em] uppercase ${getStatusColor(lead.status || "new")}`}>
                            {getStatusLabel(lead.status || "new")}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[0.75rem] text-[#8A8A8A] font-light whitespace-nowrap">
                          {formatDate(lead.$createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            {/* View Button */}
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-[6px] hover:bg-[#F5F5F7] transition-colors text-[#8A8A8A] hover:text-[#000000]"
                              aria-label="View lead details"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteLead(lead.$id)}
                              disabled={isDeleting}
                              className="p-1.5 rounded-[6px] hover:bg-[#FEE2E2] transition-colors text-[#8A8A8A] hover:text-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label="Delete lead"
                              title="Delete lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#FFFFFF] border border-[#E8E8EC] rounded-[8px] shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#E8E8EC] flex items-center justify-between">
              <h2 className="font-serif text-[1.25rem] font-medium text-[#000000]">
                Lead Details
              </h2>
              <div className="flex items-center gap-2">
                {/* Delete button in modal */}
                <button
                  onClick={() => {
                    setSelectedLead(null);
                    handleDeleteLead(selectedLead.$id);
                  }}
                  disabled={isDeleting}
                  className="p-2 rounded-[6px] hover:bg-[#FEE2E2] transition-colors text-[#8A8A8A] hover:text-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Delete lead"
                  title="Delete lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-[#8A8A8A] hover:text-[#000000] transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Name</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.name || "-"}</p>
                </div>
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Business</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.business || "-"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Email</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.email || "-"}</p>
                </div>
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Phone</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.phone || "-"}</p>
                </div>
              </div>
              <div>
                <p className="label text-[0.5rem] text-[#8A8A8A]">Message</p>
                <p className="text-[0.9375rem] font-light text-[#000000] bg-[#F5F5F7] p-4 rounded-[7px] mt-1">
                  {selectedLead.message || "-"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Source</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.source || "-"}</p>
                </div>
                <div>
                  <p className="label text-[0.5rem] text-[#8A8A8A]">Page</p>
                  <p className="text-[0.9375rem] font-light text-[#000000]">{selectedLead.page || "-"}</p>
                </div>
              </div>
              <div>
                <p className="label text-[0.5rem] text-[#8A8A8A]">Status</p>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {(["new", "contacted", "converted", "archived"] as LeadStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedLead.$id, status)}
                      disabled={updatingStatus || selectedLead.status === status}
                      className={`px-3 py-1.5 rounded-full text-[0.6rem] font-medium tracking-[0.06em] uppercase transition-colors ${
                        selectedLead.status === status
                          ? getStatusColor(status)
                          : "bg-[#F5F5F7] text-[#8A8A8A] hover:bg-[#E8E8EC]"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="label text-[0.5rem] text-[#8A8A8A]">Received</p>
                <p className="text-[0.875rem] font-light text-[#000000]">{formatDate(selectedLead.$createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}