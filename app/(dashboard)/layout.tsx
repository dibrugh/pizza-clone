export const metadata = {
	title: "Next Pizza | Dashboard",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<header>DashBOARD HEADER</header>

			<body>{children}</body>
		</html>
	);
}
