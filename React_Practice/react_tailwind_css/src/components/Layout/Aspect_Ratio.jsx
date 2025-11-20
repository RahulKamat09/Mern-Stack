export default function AspectRatio() {
    return (
        <div>

            <section classname="p-6 space-y-6">
                {'{'}/* 16:9 */{'}'}
                <div classname="w-full max-w-3xl mx-auto">
                    <h2 classname="mb-2 text-lg font-semibold">Aspect - Video (16:9)</h2>
                    <div classname="aspect-video bg-blue-100 rounded-lg">
                        <iframe classname="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
                    </div>
                </div>
                {'{'}/* 1:1 */{'}'}
                <div classname="w-64 mx-auto">
                    <h2 classname="mb-2 text-lg font-semibold">Aspect - Square (1:1)</h2>
                    <div classname="aspect-square bg-rose-100 rounded-lg">
                        <iframe classname="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
                    </div>
                </div>
                {'{'}/* 4:3 */{'}'}
                <div classname="w-full max-w-2xl mx-auto">
                    <h2 classname="mb-2 text-lg font-semibold">Aspect - Custom (4/3)</h2>
                    <div classname="aspect[4/3] bg-emerald-100 rounded-lg">
                        <iframe classname="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
                    </div>
                </div>
            </section>

        </div>
    );
}
