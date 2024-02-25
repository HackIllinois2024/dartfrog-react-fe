import './ResponseText.css';
import { where, query, getDocs, collection, getFirestore } from 'firebase/firestore';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import { Fragment, useState, useEffect } from 'react';
const db = getFirestore(app);

function ResponseText({tester}) {
    const [userResponses, setUserResponses] = useState([]);
    var responses = [];
    useEffect(() => {
        // This useEffect will run once when the component mounts
        const getUserResponses = async () => {
            const responseMessagesQuery = query(collection(db, 'responseMessages'), where('user_id', '==', "Da6AzPT7rPWIlkrUL1zCacYmEVl2"), where('fileID', '==', localStorage.getItem('component_id')));
            const querySnapshot = await getDocs(responseMessagesQuery);
            querySnapshot.forEach((doc) => {
                responses.push({
                    id: String(responses.length),
                    response: doc.data().response, // Assuming 'response' is the field you want
                });
            });
            setUserResponses(responses); // Update state with the fetched data
        };

        getUserResponses(); // Call the function to fetch data
    }, [responses]); // Empty dependency array means this effect runs once on mount

    return (
        <div className='response-text-container'>
            {userResponses.map((chat) => (
                <Fragment key={chat.id}>
                    <div>{chat.response}</div>
                </Fragment>
            ))}
        </div>
    );
}

export default ResponseText;
