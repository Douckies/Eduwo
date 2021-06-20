import '../Style/footer.css';

function Header() {
	return (
		<div className="footerPage">
			<div className="text-white font-bold p-4">
				Eduwo Task @{new Date().getFullYear()}
			</div>
		</div>
	);
}

export default Header;
