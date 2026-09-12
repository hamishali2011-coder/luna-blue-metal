import { Link } from 'react-router-dom'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import WireLoop from './WireLoop'
import { CATEGORIES } from '../data/sampleProducts'

export default function Footer() {
  return (
    <footer className="bg-midnight-800 text-silver-200 mt-24">
      <div className="container-page pt-16 pb-8">
        <WireLoop className="w-40 h-6 text-midnight-400 mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo dark />
            <p className="mt-4 text-[14px] leading-relaxed text-silver-300 max-w-[220px]">
              Every piece is shaped by hand, one wire at a time, in small batches.
            </p>
          </div>

          <div>
            <p className="text-[13px] uppercase tracking-wider text-silver-400 mb-4">Shop</p>
            <ul className="space-y-2.5 text-[14.5px]">
              {CATEGORIES.slice(0,
