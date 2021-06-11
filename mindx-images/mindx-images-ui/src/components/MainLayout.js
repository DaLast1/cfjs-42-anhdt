import CustomNavBar from '../components/NavBar/NavBar';

function MainLayout({ children }) {
    return (
        <div className="MainLayout">
            <CustomNavBar/>
            <div className="main-content">
                {children}
            </div>
        </div>
    )
}

export default MainLayout;