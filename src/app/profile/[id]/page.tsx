export default function UserProfilePAge({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4 text-gray-800">
            <h1>Profile Page</h1>
            <hr />
            <p className="text-gray-600 text-4xl">Profile ID: {params.id}</p>
        </div>
    );
}