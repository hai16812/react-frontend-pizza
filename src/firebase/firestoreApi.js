// Thin Firestore data-access layer used by both the public pages
// (read-only) and the admin dashboard (full CRUD).
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

// ---------- Food items (products) ----------
const foodItemsRef = collection(db, "foodItems");

export function listenFoodItems(callback) {
  const q = query(foodItemsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function getFoodItems() {
  const snap = await getDocs(query(foodItemsRef, orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getFoodItem(id) {
  const docRef = doc(db, "foodItems", id);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

export function addFoodItem(data) {
  return addDoc(foodItemsRef, { ...data, createdAt: serverTimestamp() });
}

export function updateFoodItem(id, data) {
  return updateDoc(doc(db, "foodItems", id), data);
}

export function deleteFoodItem(id) {
  return deleteDoc(doc(db, "foodItems", id));
}

// ---------- Services ----------
const servicesRef = collection(db, "services");

export function listenServices(callback) {
  const q = query(servicesRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export async function getServices() {
  const snap = await getDocs(query(servicesRef, orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function addService(data) {
  return addDoc(servicesRef, { ...data, createdAt: serverTimestamp() });
}

export function updateService(id, data) {
  return updateDoc(doc(db, "services", id), data);
}

export function deleteService(id) {
  return deleteDoc(doc(db, "services", id));
}

// ---------- Contact messages ----------
const messagesRef = collection(db, "contactMessages");

export function sendContactMessage(data) {
  return addDoc(messagesRef, { ...data, createdAt: serverTimestamp() });
}

export function listenContactMessages(callback) {
  const q = query(messagesRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

// ---------- Users (admin: view + change roles) ----------
const usersRef = collection(db, "users");

export function listenUsers(callback) {
  const q = query(usersRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

export function updateUserRole(id, role) {
  return updateDoc(doc(db, "users", id), { role });
}
