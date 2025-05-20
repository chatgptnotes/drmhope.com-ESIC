import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function OtherInvestigations() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardDocumentCheckIcon className="w-7 h-7 text-gray-500" />
        <h1 className="text-2xl font-bold">Other Investigations</h1>
      </div>
      <div className="text-gray-500">Other Investigations content goes here.</div>
    </div>
  );
} 