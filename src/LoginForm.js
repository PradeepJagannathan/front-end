export function LoginForm(params) {

    const handleChange = (event) => {
        let newCredentials = { ...params.credentials };
        newCredentials[event.target.name] = event.target.value;
        params.setCredentials(newCredentials);
    };

    return (
        <div>
            <button onClick={params.login}>
                {params.currentUser ? "Logout" : "Login"}
            </button>
            <div>
                Current&nbsp;User:{" "}
                <span style={{ fontWeight: "bold" }}>
                    {params.currentUser ? params.currentUser.user : "not logged in"}
                </span>
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
        </div>
    );
}