/**
 * get username from url
 * example:
 * url be like: @tokitouq
 * get_username(url) => tokitouq
 */
export function get_username(str: string) {
	return str.slice(1);
}
