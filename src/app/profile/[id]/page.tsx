export default function UserProfile({ params }: { params: { id: string } }) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-4">User Profile</h1>
          <hr className="mb-6" />
          <p className="text-lg text-gray-600 text-center">
            Welcome to the profile page of:
          </p>
          <div className="text-center mt-4">
            <span className="p-3 text-lg rounded-lg bg-orange-500 text-white font-medium">
              {params.id}
            </span>
          </div>
        </div>
      </div>
    );
  }
  