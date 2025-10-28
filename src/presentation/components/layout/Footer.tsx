"use client";

import Link from "next/link";
import { Facebook, Twitter, Youtube, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "เล่นเกม", href: "/play" },
      { name: "ทัวร์นาเม้นต์", href: "/tournaments" },
      { name: "อันดับ", href: "/leaderboard" },
      { name: "ชุมชน", href: "/community" },
    ],
    learn: [
      { name: "เรียนรู้หมากรุก", href: "/learn" },
      { name: "บทเรียน", href: "/learn/lessons" },
      { name: "ปริศนา", href: "/learn/puzzles" },
      { name: "กลยุทธ์", href: "/learn/strategies" },
    ],
    company: [
      { name: "เกี่ยวกับเรา", href: "/about" },
      { name: "ทีมงาน", href: "/team" },
      { name: "ติดต่อเรา", href: "/contact" },
      { name: "ร่วมงานกับเรา", href: "/careers" },
    ],
    legal: [
      { name: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
      { name: "เงื่อนไขการใช้งาน", href: "/terms" },
      { name: "นโยบาย Fair Play", href: "/fair-play" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Youtube", icon: Youtube, href: "https://youtube.com" },
    { name: "Github", icon: Github, href: "https://github.com" },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="text-3xl">♔</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Makruk Legends
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs">
              แพลตฟอร์มหมากรุกไทยออนไลน์ที่ดีที่สุด เชื่อมต่อผู้เล่นทั่วโลก
              พร้อมระบบการแข่งขันระดับมืออาชีพ
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              ผลิตภัณฑ์
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              เรียนรู้
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              บริษัท
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Makruk Legends. สงวนลิขสิทธิ์.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Made with ❤️ in Thailand
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
