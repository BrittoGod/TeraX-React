"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Download,
  Play,
  Link,
  FileVideo,
  Clock,
  HardDrive,
  Shield,
  Zap,
  Globe,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function TeraboxClone() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleFetchVideo = async () => {
    if (!inputUrl.trim()) {
      setStatus({ message: "Please enter a URL", type: "error" });
      return;
    }

    if (!agreedToTos) {
      setStatus({ message: "You must accept the Terms of Service to proceed.", type: "error" });
      return;
    }

    try {
      setIsLoading(true);
      setStatus({ message: "Processing URL...", type: "info" });

      const response = await axios.post("https://tera-express.vercel.app/api/get", { url: inputUrl }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200 || !response.data.success) {
        throw new Error("Invalid URL or metadata not found");
      }

      const { title, thumbnail, videoUrl } = response.data.data;

      setVideoData({
        url: videoUrl,
        title,
        duration: "--", // Replace with actual value if available
        size: "--",     // Replace with actual value if available
        quality: "HD",  // Replace with actual value if available
        thumbnail,
      });

      setStatus({ message: "Video URL and metadata fetched successfully!", type: "success" });
    } catch (error) {
      console.error("Error:", error);
      setStatus({ message: "Error processing URL. Please check the format.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchAnother = () => {
    // Reset all states to initial values
    setIsLoading(true);
    setInputUrl("");
    setVideoData(null);
    setStatus({ message: "", type: "" });
    setIsPlaying(false);
    setAgreedToTos(false);
    // Simulate fetch or do your async operation
    setTimeout(() => {
      router.refresh(); // Refresh the current page
      setIsLoading(false);
    }, 1000);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 h-16">
              <div className="h-13">
                <p style={{ fontFamily: 'Armageda', fontSize: '40px', lineHeight: '64px', margin: 0 }}>
                  TERAX
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Badge variant="secondary" className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0">
                <Zap className="w-3 h-3 mr-1" />
                Premium Free
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Link className="w-4 h-4 text-white" />
              </div>
              <span>Enter Video URL</span>
            </CardTitle>
            <CardDescription className="text-base">
              Paste your video URL below to fetch and stream high-quality content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="https://example.com/video.mp4"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleFetchVideo}
                disabled={isLoading || !agreedToTos}
                className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Fetching...
                  </>
                ) : (
                  "Fetch Video"
                )}
              </Button>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border/30">
              <Checkbox
                id="tos-agreement"
                checked={agreedToTos}
                onCheckedChange={(checked) => setAgreedToTos(checked)}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="tos-agreement" className="text-sm font-medium cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy
                </label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By checking this box, you acknowledge that you have read and agree to our
                  <a href="#" className="text-blue-600 hover:underline"> Terms of Service </a>
                  and
                  <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                </p>
              </div>
            </div>

            {status.message && (
              <p className={`text-sm ${status.type === "error" ? "text-red-500" : status.type === "success" ? "text-green-500" : "text-blue-500"}`}>
                {status.message}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Video Preview */}
        {videoData && (
          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">{videoData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
                {isPlaying ? (
                  <video controls autoPlay className="w-full h-full" poster={videoData.thumbnail}>
                    <source src={videoData.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="relative w-full h-full bg-cover bg-center cursor-pointer group"
                    style={{ backgroundImage: `url(${videoData.thumbnail})` }}
                    onClick={handlePlay}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons under video */}
              <div className="flex space-x-4">
                <a
                  href={videoData.url}
                  download
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </a>
                <Button
                  size="sm"
                  onClick={handleFetchAnother}
                  className="px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Fetch Another
                </Button>
              </div>
            </CardContent>
          </Card>
        )}


        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stream videos instantly with our advanced CDN technology and optimized servers
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Ultra HD Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Support for 4K, 8K video quality with lossless compression technology
              </p>
            </CardContent>
          </Card>
          <Card className="bg-background/60 backdrop-blur-xl border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">Global Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access content from anywhere with our worldwide server network
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-background/80 backdrop-blur-xl border-t border-border/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Tera-X. Built with cutting-edge technology for the modern web.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}