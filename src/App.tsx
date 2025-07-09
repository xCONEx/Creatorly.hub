
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RequireAdmin from "./components/RequireAdmin";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPosts from "./pages/AdminPosts";
import AdminCategories from "./pages/AdminCategories";
import PostEditor from "./pages/PostEditor";
import NotFound from "./pages/NotFound";
import FinanceFlowSales from "./pages/FinanceFlowSales";
import OrcaFacilSales from "./pages/OrcaFacilSales";
import ContratProSales from "./pages/ContratProSales";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/financeflow" element={<FinanceFlowSales />} />
            <Route path="/orcafacil" element={<OrcaFacilSales />} />
            <Route path="/contratpro" element={<ContratProSales />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <RequireAdmin allowedRoles={['admin', 'moderator', 'editor']}>
                  <AdminDashboard />
                </RequireAdmin>
              } 
            />
            <Route 
              path="/admin/posts" 
              element={
                <RequireAdmin allowedRoles={['admin', 'moderator', 'editor']}>
                  <AdminPosts />
                </RequireAdmin>
              } 
            />
            <Route 
              path="/admin/categories" 
              element={
                <RequireAdmin allowedRoles={['admin']}>
                  <AdminCategories />
                </RequireAdmin>
              } 
            />
            <Route 
              path="/admin/posts/new" 
              element={
                <RequireAdmin allowedRoles={['admin', 'editor']}>
                  <PostEditor />
                </RequireAdmin>
              } 
            />
            <Route 
              path="/admin/posts/edit/:id" 
              element={
                <RequireAdmin allowedRoles={['admin', 'editor']}>
                  <PostEditor />
                </RequireAdmin>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
