interface DateChipProps {
  date: Date;
}

export default function DateChip({ date }: DateChipProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-2 justify-between h-4 border border-gray-300 text-xs text-gray-500 absolute bottom-2 left-2 gap-2">
      {new Date(date).toLocaleString([], {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  );
}
