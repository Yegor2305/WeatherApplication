import {instanceAuth} from "../api/axios.api.ts";
import {IPlace, IPlaceInfo} from "../types/types.ts";


export const UserService = {
    async getUserPlaces() : Promise<IPlaceInfo[]> {
        const {data} = await instanceAuth.get<IPlaceInfo[]>("/user/places");
        return data;
    },

    async addUserPlace(placeInfo : IPlace) : Promise<void> {
        await instanceAuth.post<IPlace>("/user/add-place/", placeInfo);

    },

    async removeUserPlace(placeName : string) : Promise<void> {
        await instanceAuth.delete<IPlaceInfo>(`/user/remove-place/${placeName}`);
    },

}