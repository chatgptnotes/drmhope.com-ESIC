import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function MedicationsMaster() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardDocumentCheckIcon className="w-7 h-7 text-gray-500" />
        <h1 className="text-2xl font-bold">Medications Master</h1>
      </div>
      <div className="text-gray-500">Medications Master content goes here.</div>
    </div>
  );
} 