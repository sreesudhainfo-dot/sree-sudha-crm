
export default function DashboardHeader() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const hour = today.getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-lg">

      <h1 className="text-4xl font-bold">
        {greeting}, Admin 👋
      </h1>

      <p className="mt-2 text-blue-100 text-lg">
        Welcome to Sree Sudha Operations Portal
      </p>

      <p className="mt-4 text-sm text-blue-200">
        {formattedDate}
      </p>

    </div>
  );
}