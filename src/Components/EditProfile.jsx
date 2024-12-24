import React, { useState, useEffect } from 'react';
import uploadPFPService from "../Appwrite/uploadPFP";
import authService from "../Appwrite/auth";




function EditProfile({ close }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [pfp, setPfp] = useState(null);  
    const [currPfp, setCurrPfp] = useState("");  
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await authService.getCurrentUser();
                
                setName(userData.name);
                setEmail(userData.email);
                setCurrPfp(userData.prefs.profilePicture); 

                const someUSer = await authService.getUSerInfo('675c683d0031768984ce')
                console.log(someUSer.email);
                
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let profilePictureUrl = currPfp|| null;  
            let pfpID = null;

            if (pfp) {
                const uploadedFile = await uploadPFPService.uploadFile(pfp);  
                if (uploadedFile) {
                    profilePictureUrl = await uploadPFPService.filePreview(uploadedFile.$id); 
                    pfpID = uploadedFile.$id; 
                }
                // console.log("New profile picture uploaded:", profilePictureUrl);
            }

             await authService.updateUserInfo({
                newName: name,
                newEmail: email,
                newPassword: password,
                currentPassword: currPassword,
                newPFP: pfpID,  
            });

            // dispatch(login({userData: updatedUserData}))

            if (currPfp) {
                await uploadPFPService.deleteFile(currPfp);  
                console.log("Deleted succeffully");
                
            }

            setName("");
            setEmail("");
            setPassword("");
            setCurrPassword("");
            setPfp(null); 
            close(); 

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="absolute bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Full Name</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Full Name"
                    />
                </div>

                <div>
                    <h2>Email Address</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email@gmail.com"
                    />
                </div>

                <div>
                    <h2>Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="New Password"
                    />
                </div>

                <div>
                    <h2>Current Password</h2>
                    <input
                        type="password"
                        value={currPassword}
                        onChange={e => setCurrPassword(e.target.value)}
                        placeholder="Current Password"
                    />
                </div>

                <div>
                    <h2>Profile Picture</h2>
                    <input
                        type="file"
                        onChange={e => setPfp(e.target.files[0])}
                    />
                    {currPfp && (
                        <div>
                            <h3>Current Profile Picture:</h3>
                            <img
                                src={currPfp}
                                alt="Current Profile"
                                className="rounded-full w-20 h-20"
                            />
                        </div>
                    )}

                    {pfp && (
                        <div>
                            <h3>New Profile Picture Preview:</h3>
                            <img
                                src={URL.createObjectURL(pfp)}
                                alt="New Profile"
                                className="rounded-full w-20 h-20"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-2 mr-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
                </button>

                <button
                    type="button"
                    onClick={close}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus"
                    disabled={loading}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
