import { Accessor, createSignal } from "solid-js";
import { LocationResponse } from "~/types/location";

export const createLocationSignal = async (): Promise<
	Accessor<LocationResponse | undefined>
> => {
	const [location, setLocation] = createSignal<
		LocationResponse | undefined
	>();

	try {
		const res = await fetch("http://ip-api.com/json/");
		const data: LocationResponse = await res.json();

		setLocation(data);
	} catch (err) {
		// err
		console.error("Cant fetch user location");
	}

	return location;
};
