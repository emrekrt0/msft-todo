export default function Header() { 
    return(
        <>
        <div className="header">
            <div className="header_left">
                <div className="otherApps">
                    <img src="/waffle-icon.svg" alt="" />
                </div>
            </div>

            <div className="header_center">
                <div className="header_text">
                    <h4>To Do</h4>
                </div>
                <div className="header_searchbar">
                    <input type="text" placeholder="Search your tasks" />
                </div>
                <div className="header_userSettings">
                    <p>settings</p>
                    <p>faq</p>
                    <p>announcment</p>
                </div>
            </div>

            <div className="header_right">
                <div className="header_user">
                    <img src="https://i.pinimg.com/originals/6b/0b/7b/6b0b7b1e0b5d8b6d3f9d7d3b9a2f5a3e.jpg" alt="user logo" />
                    <h4>Username</h4>
                </div>
            </div>
        </div>
        </>
    )
}