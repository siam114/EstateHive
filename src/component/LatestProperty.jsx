const LatestProperty = () => {
  return (
    <>
      <section className="bg-[url(https://i.ibb.co.com/12QFNPb/Eco-friendly-house.webp)] bg-cover bg-center bg-no-repeat">
        <div className="bg-black/60 p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
              Latest Property
            </h2>

            <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              Nestled by the beautiful lakes of Rangamati, this villa features 3
              bedrooms, a private balcony, and serene views. Perfect for a
              peaceful retreat.
            </p>

            <div className="mt-4 sm:mt-8">
              <a
                href={'/property/679754f79004ffde512f62f2'}
                className="inline-block rounded-full bg-[#363e94] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#363e94af] focus:ring-3 focus:ring-yellow-400 focus:outline-hidden"
              >
                Get Yours Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestProperty;
