import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const getCategories = async () => {
    try {
        const tempList = [];
        const q = query(collection(db, 'categories'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let tempCategory = {};
            tempCategory = doc.data();
            tempCategory.id = doc.id;
            tempList.push(tempCategory);
        });
        return tempList;
    } catch (error) {
        console.log(error);
    }
}
