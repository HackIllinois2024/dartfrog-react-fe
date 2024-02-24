import React, { Fragment, useState } from 'react';
import './UploadSection.css';
import { useDropzone } from 'react-dropzone';
import app from '../../firebaseconfig';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import ChatInstance from '../chat-instance/ChatInstance';
const db = getFirestore(app);

function UploadSection() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);
            const reader = new FileReader();
            reader.addEventListener('load', function(e) {
                let fileContents = e.target.result
            });
            // Handle file uploads
            for (const file of acceptedFiles) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const text = e.target.result;
                    try {
                        await addDoc(collection(db, "csvUploads"), {
                            content: text, // Assuming you want to store the CSV content in a field named 'content'
                            name: file.name,
                            timestamp: new Date(), // Or use serverTimestamp() if you imported it
                        });
                    } catch (error) {
                        console.error("Error uploading CSV content to Firestore:", error);
                    }
                };
                reader.readAsText(file); // Read the file as plain text
            }
        },
    });

    const chats =
        [{id: "Component1", component: ChatInstance("New Chat 1", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component2", component: ChatInstance("New Chat 2", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component3", component: ChatInstance("New Chat 3", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component4", component: ChatInstance("New Chat 4", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component5", component: ChatInstance("New Chat 5", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component6", component: ChatInstance("New Chat 6", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component7", component: ChatInstance("New Chat 7", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component8", component: ChatInstance("Long Chat overflow testing here right now", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
        ,{id: "Component1", component: ChatInstance("New Chat 1", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component2", component: ChatInstance("New Chat 2", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component3", component: ChatInstance("New Chat 3", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component4", component: ChatInstance("New Chat 4", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component5", component: ChatInstance("New Chat 5", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component6", component: ChatInstance("New Chat 6", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component7", component: ChatInstance("New Chat 7", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}
            , {id: "Component8", component: ChatInstance("Long Chat overflow testing here right now", "This is an example description for this chat. Here we see that an ellipsis is automatically formed as this sentence is quite too long.")}]

    return (
        <div className="upload-section">

            <div className="sidebar">
            Past Chats
            {chats.map((chat) =>
                <Fragment key={chat.id}>
                    {chat.component}
                </Fragment>)}
            </div>
            <div className="upload-area" {...getRootProps()}>
                <input type="file" accept=".csv" {...getInputProps()}/>
                <p>Drag files here, or click to search your computer.</p>
            </div>
        </div>
    );
}

export default UploadSection;
