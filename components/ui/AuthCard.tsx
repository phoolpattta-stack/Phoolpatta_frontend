"use client";

export default function AuthCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4 text-center">{title}</h1>
      {children}
    </div>
  );
}
