import { writable } from "svelte/store";

let user_store = writable([]);
let user_pages_store = writable([]);

export { user_store, user_pages_store };

// user_store.subscribe((value) => localStorage.setItem(user, value));