export default function BreakAfter() {
    return (
        <section className="p-6 space-y-10">

            {/* break-after-auto */}
            <div>
                <h2 className="text-lg font-semibold mb-3">break-after-auto</h2>
                <div className="columns-2">
                    <p className="break-after-auto bg-blue-100 p-3 rounded">
                        This paragraph uses <strong>break-after-auto</strong>.
                    </p>
                    <p className="bg-blue-100 p-3 rounded">Next content flows normally.</p>
                </div>
            </div>

            {/* break-after-avoid */}
            <div>
                <h2 className="text-lg font-semibold mb-3">break-after-avoid</h2>
                <div className="columns-2">
                    <p className="break-after-avoid bg-green-100 p-3 rounded">
                        Prevent breaking after this block.
                    </p>
                    <p className="bg-green-100 p-3 rounded">Content continues in same column.</p>
                </div>
            </div>

            {/* break-after-all */}
            <div>
                <h2 className="text-lg font-semibold mb-3">break-after-all</h2>
                <div className="columns-2">
                    <p className="break-after-all bg-purple-100 p-3 rounded">
                        Forces breaking after this block.
                    </p>
                    <p className="bg-purple-100 p-3 rounded">This appears in next column.</p>
                </div>
            </div>

            {/* break-after-page */}
            <div>
                <h2 className="text-lg font-semibold mb-3">break-after-page</h2>
                <div className="columns-2">
                    <p className="break-after-page bg-orange-100 p-3 rounded">
                        Page-level break (used in printing/PDF layouts).
                    </p>
                    <p className="bg-orange-100 p-3 rounded">Next content prints on new page.</p>
                </div>
            </div>

            {/* Column-specific breaks */}
            <div>
                <h2 className="text-lg font-semibold mb-3">Column Break Types</h2>
                <div className="columns-3 gap-4">
                    <p className="break-after-column bg-red-100 p-3 rounded">
                        break-after-column — moves next item to next column.
                    </p>
                    <p className="bg-red-100 p-3 rounded">Next column content.</p>
                    <p className="bg-red-100 p-3 rounded">More content.</p>
                </div>
            </div>

            {/* Responsive break-after classes */}
            <div>
                <h2 className="text-lg font-semibold mb-3">
                    Responsive Break After (sm, md, lg)
                </h2>

                <div className="columns-2 gap-4">
                    <p className="sm:break-after-column md:break-after-all lg:break-after-avoid bg-yellow-100 p-3 rounded">
                        Responsive example:
                        <br />
                        <strong>sm:</strong> break-after-column
                        <br />
                        <strong>md:</strong> break-after-all
                        <br />
                        <strong>lg:</strong> break-after-avoid
                    </p>

                    <p className="bg-yellow-100 p-3 rounded">
                        Watch how this block moves on different screen sizes.
                    </p>
                </div>
            </div>

        </section>
    );
}
