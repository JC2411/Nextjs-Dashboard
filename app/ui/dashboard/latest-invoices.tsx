// app/ui/dashboard/latest-invoices.tsx
import { fetchLatestInvoices } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default async function LatestInvoices() {
  const invoices = await fetchLatestInvoices();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 col-span-4">
      <h2 className={`${lusitana.className} text-xl mb-4`}>Latest Invoices</h2>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.email} className="flex items-center gap-4">
            <Image
              src={invoice.image_url}
              alt={invoice.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{invoice.name}</p>
              <p className="text-sm text-gray-600">{invoice.email}</p>
              <p className="text-sm text-gray-500">
                {formatCurrency(invoice.amount)} • {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 col-span-4 h-[400px] animate-pulse">
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
