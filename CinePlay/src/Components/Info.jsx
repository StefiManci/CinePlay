export default function Info({ data }) {
    return (
        <>
            <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 space-y-4 text-gray-800">
                <h2 className="text-2xl font-bold border-b pb-2 mb-4 text-blue-600">Movie Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm sm:text-base">
                    <InfoRow label="Title" value={data.Title} />
                    <InfoRow label="Release Date" value={data.Year} />
                    <InfoRow label="Rating" value={data.Rated} />
                    <InfoRow label="Release" value={data.Released} />
                    <InfoRow label="Runtime" value={data.Runtime} />
                    <InfoRow label="Genre" value={data.Genre} />
                    <InfoRow label="Director" value={data.Director} />
                    <InfoRow label="Writer" value={data.Writer} />
                    <InfoRow label="Actors" value={data.Actors} />
                    <InfoRow label="Language" value={data.Language} />
                    <InfoRow label="Country" value={data.Country} />
                    <InfoRow label="Awards" value={data.Awards} />
                </div>

                <div className="mt-6">
                    <p className="text-lg font-semibold text-gray-700 mb-1">Plot</p>
                    <p className="text-gray-600 leading-relaxed">{data.Plot}</p>
                </div>
            </div>
        </>
    );
}

// Reusable info row component
function InfoRow({ label, value }) {
    return (
        <div className="flex">
            <span className="font-semibold w-28 text-gray-700">{label}:</span>
            <span className="text-gray-600">{value}</span>
        </div>
    );
}
