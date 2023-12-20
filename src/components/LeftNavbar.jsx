import { Outlet, Link } from "react-router-dom";

export default function LeftNavbar() {
    return(
        <div className="leftNavBar">
            <div className="leftNavBarTop">
                <div className="hamburgerMenu">
                    <p>hamburgericon</p>
                </div>
                <div className="lNavbar">
                    <ul className="lNavbarList">
                        <li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10 2c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm0 12a4 4 0 100-8 4 4 0 000 8zm0-1a3 3 0 110-6 3 3 0 010 6zm7.5-2.5a.5.5 0 000-1h-1a.5.5 0 000 1h1zM10 16c.28 0 .5.22.5.5v1a.5.5 0 01-1 0v-1c0-.28.22-.5.5-.5zm-6.5-5.5a.5.5 0 000-1H2.46a.5.5 0 000 1H3.5zm.65-6.35c.2-.2.5-.2.7 0l1 1a.5.5 0 11-.7.7l-1-1a.5.5 0 010-.7zm.7 11.7a.5.5 0 01-.7-.7l1-1a.5.5 0 01.7.7l-1 1zm11-11.7a.5.5 0 00-.7 0l-1 1a.5.5 0 00.7.7l1-1a.5.5 0 000-.7zm-.7 11.7a.5.5 0 00.7-.7l-1-1a.5.5 0 00-.7.7l1 1z" fill="currentColor"></path></svg>
                        <Link to={`/`}>My Day</Link>
                        </li>
                        <li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9zm.9.44L8.07 7.25a1 1 0 01-.75.55L3 8.43l3.12 3.04a1 1 0 01.3.89l-.75 4.3 3.87-2.03a1 1 0 01.93 0l3.86 2.03-.74-4.3a1 1 0 01.29-.89L17 8.43l-4.32-.63a1 1 0 01-.75-.55L10 3.35z" fill="currentColor"></path></svg>
                            <Link to={`/important`}>Important</Link>
                        </li>
                        <a href="#!"><li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg>
                            Planned</li></a>
                        <a href="#!"><li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10 2a4 4 0 100 8 4 4 0 000-8zM7 6a3 3 0 116 0 3 3 0 01-6 0zm-2 5a2 2 0 00-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0010 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0017 13a2 2 0 00-2-2H5zm-1 2a1 1 0 011-1h10a1 1 0 011 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0110 17a8.16 8.16 0 01-4.33-1.05A3.36 3.36 0 014 13z" fill="currentColor"></path></svg>
                            Assigned to me</li></a>
                        <a href="#!"><li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M4.5 13h11a.5.5 0 00.42-.78L13.1 8l2.82-4.22A.5.5 0 0015.5 3H4a.5.5 0 00-.5.5v14a.5.5 0 001 0V13zm0-1V4h10.07l-2.49 3.72a.5.5 0 000 .56L14.57 12H4.5z" fill="currentColor"></path></svg>
                            Flagged email</li></a>
                        <a href="#!"><li>
                        <svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M9 2.39a1.5 1.5 0 012 0l5.5 4.94c.32.28.5.69.5 1.12v7.05c0 .83-.67 1.5-1.5 1.5H13a1.5 1.5 0 01-1.5-1.5V12a.5.5 0 00-.5-.5H9a.5.5 0 00-.5.5v3.5c0 .83-.67 1.5-1.5 1.5H4.5A1.5 1.5 0 013 15.5V8.45c0-.43.18-.84.5-1.12L9 2.39zm1.33.74a.5.5 0 00-.66 0l-5.5 4.94a.5.5 0 00-.17.38v7.05c0 .28.22.5.5.5H7a.5.5 0 00.5-.5V12c0-.83.67-1.5 1.5-1.5h2c.83 0 1.5.67 1.5 1.5v3.5c0 .28.22.5.5.5h2.5a.5.5 0 00.5-.5V8.45a.5.5 0 00-.17-.38l-5.5-4.94z" fill="currentColor"></path></svg>
                            Tasks</li></a>
                    </ul>
                </div>
                <div className="splitter">
                </div>
                <div className="addNewList">
                    Yeni Liste Ekle
                </div>
            </div>
            <div className="leftNavBarBottom">
                <div className="officeButtons">
                <a href="#!" title="Mail"><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 4A2.5 2.5 0 0118 6.5v8a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 14.5v-8A2.5 2.5 0 014.5 4h11zM17 7.96l-6.75 3.97a.5.5 0 01-.42.04l-.08-.04L3 7.96v6.54c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5V7.96zM15.5 5h-11C3.67 5 3 5.67 3 6.5v.3l7 4.12 7-4.12v-.3c0-.83-.67-1.5-1.5-1.5z" fill="currentColor"></path></svg></a>
                <a href="#!" title="Calendar"><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 11a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm1 2a1 1 0 11-2 0 1 1 0 012 0zm2-2a1 1 0 100-2 1 1 0 000 2zm4-5.5A2.5 2.5 0 0014.5 3h-9A2.5 2.5 0 003 5.5v9A2.5 2.5 0 005.5 17h9a2.5 2.5 0 002.5-2.5v-9zM4 7h12v7.5c0 .83-.67 1.5-1.5 1.5h-9A1.5 1.5 0 014 14.5V7zm1.5-3h9c.83 0 1.5.67 1.5 1.5V6H4v-.5C4 4.67 4.67 4 5.5 4z" fill="currentColor"></path></svg></a>
                <a href="#!" title="People"><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 6.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM6.75 3.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.69 11.65c.53.21 1.21.35 2.06.35 1.88 0 2.92-.67 3.47-1.43a2.92 2.92 0 00.53-1.5v-.07c0-.83-.67-1.5-1.5-1.5h-4.63c.24.29.42.63.53 1H17c.28 0 .5.22.5.5v.1l-.04.22c-.04.18-.13.42-.3.66-.33.46-1.04 1.02-2.66 1.02-.73 0-1.28-.11-1.69-.28-.08.28-.2.6-.37.93zM1.5 13c0-1.1.9-2 2-2H10a2 2 0 012 2V13.08a1.43 1.43 0 01-.01.18 3.95 3.95 0 01-.67 1.8C10.62 16.09 9.26 17 6.75 17c-2.51 0-3.87-.92-4.57-1.93a3.95 3.95 0 01-.68-1.99V13zm1 .06v.1l.06.33c.07.27.2.64.45 1C3.49 15.2 4.5 16 6.75 16s3.26-.8 3.74-1.5a2.95 2.95 0 00.5-1.42l.01-.02V13a1 1 0 00-1-1H3.5a1 1 0 00-1 1v.06zM13 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM14.5 5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" fill="currentColor"></path></svg></a>
                <a href="#!" title="Files"><svg class="fluentIcon ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.83 10.48l5.65-5.65a3 3 0 014.25 4.24L8 15.8a1.5 1.5 0 01-2.12-2.12l6-6.01a.5.5 0 10-.7-.71l-6 6.01a2.5 2.5 0 003.53 3.54l6.71-6.72a4 4 0 10-5.65-5.66L4.12 9.78a.5.5 0 00.7.7z" fill="currentColor"></path></svg></a>
                </div>
            </div>
        </div>
    )
}