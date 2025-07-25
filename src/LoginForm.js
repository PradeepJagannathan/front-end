export function LoginForm(params) {

    const handleChange = (event) => {
        let newCredentials = { ...params.credentials };
        newCredentials[event.target.name] = event.target.value;
        console.log("newCredentials: ", newCredentials);
        params.setCredentials(newCredentials);
    };

    return (
        <div>
            <div>
                Current&nbsp;User:{" "}
                <span style={{ fontWeight: "bold" }}>
                    {params.currentUser ? params.currentUser.user : "not logged in"}
                </span>
                <br />
                <br />
            </div>

            <div className={params.currentUser ? "hidden" : "visible"}>
                <div className="form-row">
                    <label htmlFor="user">User:</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        value={params.credentials.user}
                        onChange={handleChange}
                        className="login-input"
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={params.credentials.password}
                        onChange={handleChange}
                        className="login-input"
                    />
                </div>
            </div>

            <button onClick={params.login}>
                {params.currentUser ? "Logout" : "Login"}
            </button>

        </div>
    );
}