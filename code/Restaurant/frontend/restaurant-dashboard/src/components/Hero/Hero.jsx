export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-68px)]">
      
      {/* 🔵 TOP gradient (allowed to overflow) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* 🔒 CLIPPING CONTAINER (clips bottom only) */}
      <div className="relative overflow-hidden min-h-screen flex items-center px-6">
        
        {/* Main content */}
        <div className="mx-auto max-w-5xl mb-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative bg-transparent rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/30 hover:ring-white/50">
              Announcing our next round of funding{" "}
              <a href="#" className="font-semibold text-indigo-400">
                <span className="absolute inset-0" />
                Read more →
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-[#FF342E] sm:text-7xl">
              Simplify Orders. Maximize Efficiency. Delight Customers.
            </h1>

            <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl">
              TapNOrder is a modern ordering solution designed to help food businesses manage orders effortlessly and serve customers smarter.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400">
                Get started
              </a>
              <a className="text-sm font-semibold">
                Learn more →
              </a>
            </div>
          </div>
        </div>

        {/* 🔴 BOTTOM gradient (clipped here) */}
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div> */}

      </div>
    </div>
  );
}
