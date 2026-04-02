export default function About() {
  return (
    <section className="relative flex flex-1 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            About TapNOrder
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simplifying the way restaurants manage orders and customers.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 text-center">
          
          <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900">
              🚀 Our Mission
            </h3>
            <p className="mt-3 text-gray-600">
              To help restaurants go digital with fast, reliable, and
              hassle-free ordering solutions.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900">
              ⚡ What We Do
            </h3>
            <p className="mt-3 text-gray-600">
              TapNOrder enables customers to browse menus, place orders, and
              pay seamlessly—without waiting or calling staff.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-900">
              🌱 Why TapNOrder
            </h3>
            <p className="mt-3 text-gray-600">
              We focus on speed, simplicity, and a modern experience that
              benefits both customers and restaurant owners.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
