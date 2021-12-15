<script>
import { onMount } from "svelte";


    let users;
    export let page;

    onMount(async() => {

        let response = await fetch ('fetch_page_users_from_id', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(page.id)
        })

        if (response.ok) {
            let data = await response.json();
            users = data.data;
            console.log(users[0]);
            // console.log(data);

        }
        else {
            console.log(error);
        }
    })
</script>

<div style="margin: auto; display: block; width: 500px;">
    <h3 style="text-align: center;">Sign-ups</h3>

    <table id="myTable" class="styled-table">
        <thead>
            <tr>
                <!-- <th>user_id</th> -->
                <th>email</th>
            </tr>
        </thead>
        <tbody>
        {#if users}
        {#each users as user}
        <tr>
            <td>{user.user_id.email}</td>
        </tr>
        {/each}
        {/if}
        </tbody>
    </table>
    </div>

<style>

.styled-table {
    border-collapse: collapse;
    /* margin: 25px 0; */
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 300px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    /* background-color: #5702a4; */
    /* color: #ffffff; */
    text-align: left;
    background-color: #dddddd;
}

.styled-table th,
.styled-table td {
    padding: 9px 12px;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table th {
    font-weight: 500;
}

.styled-table tbody tr:last-of-type {
    /* border-bottom: 2px solid #5702a4; */
}
</style>