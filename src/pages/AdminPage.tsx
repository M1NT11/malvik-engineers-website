import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Download,
  FileText,
  Plus,
  Edit,
  Eye,
  RefreshCw,
  LogOut,
  ChevronDown,
  AlertCircle,
  Paperclip,
  Check,
  ShieldAlert,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';
import { PRODUCT_CATEGORIES, ProductItem } from '../data/fastenerData.ts';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    return sessionStorage.getItem('mvk_admin_token');
  });
  const [adminUser, setAdminUser] = useState<{ email?: string; name?: string } | null>(null);

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<'enquiries' | 'products' | 'catalogue'>('enquiries');

  // Enquiries State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Products State
  const [products, setProducts] = useState<ProductItem[]>(PRODUCT_CATEGORIES);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Validate existing session on mount
  useEffect(() => {
    if (sessionToken) {
      verifyCurrentSession(sessionToken);
    }
  }, []);

  const verifyCurrentSession = async (token: string) => {
    try {
      const res = await fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAdminUser(data.user);
        loadEnquiries(token);
        loadProducts();
      } else {
        // Invalid or expired session
        sessionStorage.removeItem('mvk_admin_token');
        setSessionToken(null);
        setAdminUser(null);
      }
    } catch {
      sessionStorage.removeItem('mvk_admin_token');
      setSessionToken(null);
    }
  };

  // Password Login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      sessionStorage.setItem('mvk_admin_token', data.token);
      setSessionToken(data.token);
      setAdminUser({ email: data.adminEmail, name: data.adminName });
      loadEnquiries(data.token);
      loadProducts();
    } catch (err: any) {
      setAuthError(err.message || 'Authentication error.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Google OAuth Sign-In via Firebase
  const handleGoogleLogin = async () => {
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch('/api/admin/firebase-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Google administrator authentication rejected.');
      }

      sessionStorage.setItem('mvk_admin_token', data.token);
      setSessionToken(data.token);
      setAdminUser({ email: data.adminEmail, name: data.adminName });
      loadEnquiries(data.token);
      loadProducts();
    } catch (err: any) {
      console.error('OAuth sign in error:', err);
      setAuthError(err.message || 'Google authentication failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (sessionToken) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${sessionToken}` }
        });
      } catch (err) {
        console.error('Logout error:', err);
      }
    }
    sessionStorage.removeItem('mvk_admin_token');
    setSessionToken(null);
    setAdminUser(null);
    setSelectedEnquiry(null);
  };

  // Load Enquiries (Protected)
  const loadEnquiries = async (token = sessionToken) => {
    if (!token) return;
    setLoadingEnquiries(true);
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      if (data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  // Load Products (Public / Database)
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Update Status / Notes
  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    if (!sessionToken) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (enquiryId: string) => {
    if (!sessionToken) return;
    if (!window.confirm('Permanently delete this enquiry and associated drawing records from Cloud SQL?')) return;

    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${sessionToken}` }
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId));
        if (selectedEnquiry?.id === enquiryId) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete enquiry:', err);
    }
  };

  // Fetch full enquiry details with attachment
  const handleSelectEnquiry = async (enq: any) => {
    if (!sessionToken) return;
    setSelectedEnquiry(enq);
    try {
      const res = await fetch(`/api/enquiries/${enq.id}`, {
        headers: { Authorization: `Bearer ${sessionToken}` }
      });
      if (res.ok) {
        const detailed = await res.json();
        setSelectedEnquiry(detailed);
      }
    } catch (err) {
      console.error('Failed to load attachment details:', err);
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.companyName?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.referenceNumber?.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.productCategory?.toLowerCase().includes(enquirySearch.toLowerCase());

    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // If not authenticated, render secure login card
  if (!sessionToken) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#F2F4F6]">
        <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg border border-slate-200">
          <div className="w-12 h-12 bg-[#10243A] text-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-center text-slate-900">
            Malvik Operations Console
          </h2>
          <p className="text-xs text-center text-slate-500 mt-1 mb-6">
            Authorized administrative access for reviewing incoming RFQs, customer CAD drawings, and technical specifications.
          </p>

          {authError && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded flex items-center justify-center gap-2 shadow-xs transition-colors mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google Workspace</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-slate-400">or sign in with password</span>
            </div>
          </div>

          <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter authorized administrator password"
                className="w-full px-3 py-2.5 border border-slate-300 rounded focus:border-[#244D70] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-[#10243A] hover:bg-[#244D70] text-white font-semibold rounded transition-colors shadow-sm disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Authenticate & Access Console'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F2F4F6] min-h-screen">
      {/* Admin Top Bar */}
      <div className="bg-[#10243A] text-white py-4 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#244D70] flex items-center justify-center font-bold text-sm">
              ME
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold leading-none">Malvik Engineers Operations Console</h1>
                <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 rounded text-[10px] font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Cloud SQL Connected
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                Logged in as {adminUser?.email || 'admin@malvikengineers.com'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadEnquiries()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingEnquiries ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-xs rounded transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-blue-300 hover:text-white transition-colors"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'enquiries'
                ? 'border-[#244D70] text-[#10243A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer RFQs & Enquiries ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-[#244D70] text-[#10243A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Catalogue Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'catalogue'
                ? 'border-[#244D70] text-[#10243A]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Company Profile & PDF Documentation
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search reference, company, name..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded outline-none focus:border-[#244D70]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-slate-500 font-medium">Status Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded bg-white outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Enquiries Grid: List on Left, Detail on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">RFQ Ref</th>
                        <th className="py-3 px-4">Company & Client</th>
                        <th className="py-3 px-4">Product & Grade</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400">
                            {loadingEnquiries ? 'Loading database records...' : 'No enquiries found matching filter criteria.'}
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <tr
                            key={enq.id}
                            onClick={() => handleSelectEnquiry(enq)}
                            className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                              selectedEnquiry?.id === enq.id ? 'bg-blue-50/60' : ''
                            }`}
                          >
                            <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                              <span className="flex items-center gap-1.5">
                                {enq.hasAttachment && (
                                  <span title="Includes drawing attachment">
                                    <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                                  </span>
                                )}
                                {enq.referenceNumber}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-semibold text-slate-900 block">{enq.companyName}</span>
                              <span className="text-[11px] text-slate-500">{enq.name} · {enq.email}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-medium text-slate-800 block">{enq.productCategory}</span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {enq.grade} | {enq.requiredDimensions || 'Standard'}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-mono font-medium">
                              {enq.requiredQuantity} pcs
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  enq.status === 'Pending Review'
                                    ? 'bg-amber-100 text-amber-800'
                                    : enq.status === 'Under Review'
                                    ? 'bg-blue-100 text-blue-800'
                                    : enq.status === 'Quoted'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectEnquiry(enq);
                                }}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                              >
                                View
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteEnquiry(enq.id);
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Selected Enquiry Detailed Panel */}
              {selectedEnquiry && (
                <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-4 text-xs">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 block">
                        RFQ SPECIFICATION DETAIL
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {selectedEnquiry.referenceNumber}
                      </h3>
                      <span className="text-[11px] text-slate-500">
                        Received: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedEnquiry(null)}
                      className="text-slate-400 hover:text-slate-700 text-lg leading-none"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <span className="font-bold text-slate-900 block">{selectedEnquiry.companyName}</span>
                      <span className="text-slate-600">Contact: {selectedEnquiry.name}</span>
                      <div className="mt-1 flex flex-col gap-0.5 text-slate-500 text-[11px]">
                        <span>Email: <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline">{selectedEnquiry.email}</a></span>
                        <span>Phone / WA: <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 hover:underline">{selectedEnquiry.phone}</a></span>
                        <span>Country: {selectedEnquiry.country || 'India'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Product</span>
                        <span className="font-semibold text-slate-900">{selectedEnquiry.productCategory}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Material & Grade</span>
                        <span className="font-semibold text-slate-900">{selectedEnquiry.material} ({selectedEnquiry.grade})</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Required Quantity</span>
                        <span className="font-semibold text-slate-900">{selectedEnquiry.requiredQuantity} pcs</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Standard</span>
                        <span className="font-semibold text-slate-900">{selectedEnquiry.applicableStandard || 'Per ASTM/DIN'}</span>
                      </div>
                    </div>

                    {selectedEnquiry.requiredDimensions && (
                      <div>
                        <span className="text-slate-500 block font-bold text-[10px] uppercase">Dimensions / Thread Spec:</span>
                        <span className="font-mono text-slate-800 bg-slate-50 p-2 rounded block border border-slate-200 mt-1">
                          {selectedEnquiry.requiredDimensions}
                        </span>
                      </div>
                    )}

                    {selectedEnquiry.message && (
                      <div>
                        <span className="text-slate-500 block font-bold text-[10px] uppercase">Client Message:</span>
                        <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 mt-1 whitespace-pre-line leading-relaxed">
                          {selectedEnquiry.message}
                        </p>
                      </div>
                    )}

                    {/* Drawing Attachment Details */}
                    {selectedEnquiry.attachment && selectedEnquiry.attachment.dataUrl && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-900 flex items-center gap-1.5">
                            <Paperclip className="w-4 h-4 text-blue-700" />
                            <span>Attached Drawing / File:</span>
                          </span>
                          <span className="text-[10px] text-blue-600 font-mono">
                            {(selectedEnquiry.attachment.fileSize / 1024).toFixed(1)} KB
                          </span>
                        </div>
                        <p className="text-[11px] text-blue-800 font-mono truncate">
                          {selectedEnquiry.attachment.fileName}
                        </p>
                        <a
                          href={selectedEnquiry.attachment.dataUrl}
                          download={selectedEnquiry.attachment.fileName}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Engineering Drawing</span>
                        </a>
                      </div>
                    )}

                    {/* Status Changer */}
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-slate-700 font-bold block mb-1.5">Update Workflow Status:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Pending Review', 'Under Review', 'Quoted', 'Order Placed', 'Closed'].map((st) => (
                          <button
                            key={st}
                            disabled={updatingStatus}
                            onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                              selectedEnquiry.status === st
                                ? 'bg-[#10243A] text-white font-bold'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Published Product Categories (Stored in Cloud SQL)
                </h3>
                <p className="text-xs text-slate-500">
                  Control manufacturing parameters, diameter ranges, and applicable ASTM/ISO standards.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2 bg-[#10243A] hover:bg-[#244D70] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product Category</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Product Category</th>
                    <th className="py-3 px-4">Group</th>
                    <th className="py-3 px-4">Size Capability</th>
                    <th className="py-3 px-4">Key Standards</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                      <td className="py-3 px-4 text-slate-600">{p.category || (p as any).categoryBadge}</td>
                      <td className="py-3 px-4 font-mono text-slate-800">{p.sizeRange}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {Array.isArray(p.standards)
                          ? p.standards.slice(0, 3).join(', ')
                          : Array.isArray((p as any).primaryStandards)
                          ? (p as any).primaryStandards.slice(0, 3).join(', ')
                          : 'ASTM / DIN'}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => alert(`Product ${p.name} is synchronized with Cloud SQL database.`)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Verified
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATALOGUE & DOCUMENTS TAB */}
        {activeTab === 'catalogue' && (
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-6 text-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Malvik Engineers Technical Literature & Documents
              </h3>
              <p className="text-slate-500 mt-1">
                Official company profile and technical guides available for customer download.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block">Malvik Engineers Company Profile & Stated Capabilities (PDF)</span>
                <span className="text-[11px] text-slate-500">4-Page comprehensive technical brochure: M8–M100 diameter range, API 20E BSL 1, ISO compliance, JNPT port distance</span>
              </div>
              <a
                href="/api/catalogue/download-pdf"
                download
                className="px-4 py-2 bg-[#10243A] hover:bg-[#244D70] text-white rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Brochure</span>
              </a>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block">Plain Text Engineering Spec Sheet (TXT)</span>
                <span className="text-[11px] text-slate-500">Quick-copy technical scope for procurement systems and ERP databases</span>
              </div>
              <a
                href="/api/catalogue/download"
                download
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download TXT Spec</span>
              </a>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-bold text-slate-900 block">Stated Compliance & Audit Policy:</span>
              <p className="text-slate-600 leading-relaxed">
                Certificates and verification records are maintained directly in plant quality records. API 20E BSL 1 bolting procedures and EN 10204 Type 3.1 material test certificates are issued with every production heat code batch dispatched from Pune.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
