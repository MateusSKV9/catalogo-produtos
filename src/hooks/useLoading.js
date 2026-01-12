import { useCallback, useState } from "react";

export function useLoading() {
	const [isLoading, setIsLoading] = useState(false);

	const run = useCallback(async (asyncFunction) => {
		setIsLoading(true);

		try {
			await asyncFunction();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return { isLoading, run };
}
