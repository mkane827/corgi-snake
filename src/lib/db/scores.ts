import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	query,
	orderBy,
	limit
} from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyDjl3W1HOKstoZ6596vYPyotbEblb08a5w',
	authDomain: 'assets-337700.firebaseapp.com',
	projectId: 'assets-337700',
	storageBucket: 'assets-337700.appspot.com',
	messagingSenderId: '16312251254',
	appId: '1:16312251254:web:3949ebf98d078fd155c057'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getHighScores(): Promise<{ name: string; score: number }[]> {
	const scores = await getDocs(
		query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10))
	);
	return scores.docs.map((doc) => ({
		name: doc.get('name') as string,
		score: doc.get('score') as number
	}));
}

export function addScore(name: string, score: number): void {
	addDoc(collection(db, 'scores'), { name, score });
}
