// Layouts
import {Default} from "./layouts/";

// Route Views
import {House, HouseList, Apartment, ApartmentList} from "./views/";

export default [
	{
		exact: true,
		path: "/houses",
		layout: Default,
		component: HouseList
	},
	{
		exact: true,
		path: "/house-register",
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
		component: ApartmentList
	},
	{
		exact: true,
		path: "/apartment-register",
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
