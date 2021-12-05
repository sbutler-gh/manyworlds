import { writable } from "svelte/store";

let user_store = writable([]);
let user_pages_store = writable([]);
let page_comments_store = writable([]);
let wants_table_store = writable([]);
let want_store = writable([]);

export { user_store, user_pages_store, page_comments_store, wants_table_store, want_store };

// user_store.subscribe((value) => localStorage.setItem(user, value));