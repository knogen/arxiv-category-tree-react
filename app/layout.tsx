import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "arXiv Category Taxonomy",
  description: "an arXiv Category Taxonomy view",
};

import {
  GithubOutlined
} from '@ant-design/icons';

interface FooterProps {
  githubUrl: string;
}

const Footer: React.FC<FooterProps> = ({ githubUrl }) => {
  return (
    <footer className="bg-gray-600/50 text-white py-4">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:text-gray-300 transition-colors duration-300"
        >
          <GithubOutlined className="mr-2" size={20} />
          <span>View source on GitHub</span>
        </a>
      </div>
    </footer>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer githubUrl="https://github.com/knogen/arxiv-category-tree-react" />
      </body>
    </html>
  );
}
