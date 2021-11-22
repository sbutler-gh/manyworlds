import { writable } from "svelte/store";

let user_store = writable([]);

export { user_store };