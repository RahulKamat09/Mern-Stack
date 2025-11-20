export default function Columns() {
    const item = (
        <p className="p-2 bg-blue-100 rounded">
            Column item
        </p>
    );

    return (
        <section className="p-6 space-y-10">

            {/* columns-1 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-1</h2>
                <div className="columns-1 gap-4">{item}{item}</div>
            </div>

            {/* columns-2 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-2</h2>
                <div className="columns-2 gap-4">{item}{item}{item}</div>
            </div>

            {/* columns-3 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-3</h2>
                <div className="columns-3 gap-4">{item}{item}{item}{item}</div>
            </div>

            {/* columns-4 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-4</h2>
                <div className="columns-4 gap-4">{item}{item}{item}{item}{item}</div>
            </div>

            {/* columns-5 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-5</h2>
                <div className="columns-5 gap-4">{item}{item}{item}</div>
            </div>

            {/* columns-6 */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-6</h2>
                <div className="columns-6 gap-4">{item}{item}{item}{item}</div>
            </div>

            {/* columns-auto */}
            <div>
                <h2 className="text-lg font-semibold mb-2">columns-auto</h2>
                <div className="columns-auto gap-4">{item}{item}{item}</div>
            </div>

            {/* Responsive columns */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Responsive: sm, md, lg, xl, 2xl</h2>
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-4">
                    {item}{item}{item}{item}{item}{item}
                </div>
            </div>

            {/* Arbitrary value */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Arbitrary: columns-[300px]</h2>
                <div className="columns-[300px] gap-4">
                    {item}{item}{item}{item}
                </div>
            </div>

        </section>
    );
}
