// Layouts
import {Default} from "./layouts/";

// Route Views
import {House, Apartment} from "./views/";

export default [
	{
		exact: true,
		path: "/houses",
		layout: Default,
		component: House
	},
	{
		exact: true,
		path: "/house/:id",
		layout: Default,
		component: House
	},
	{
		exact: true,
		path: "/apartments",
		layout: Default,
		component: Apartment
	},
	{
		exact: true,
		path: "/apartment/:id",
		layout: Default,
		component: Apartment
	},
];
