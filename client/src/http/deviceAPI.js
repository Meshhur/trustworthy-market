import { $host, $authHost } from "./index.js";

export const createType = async (type) => {
    const { data } = await $authHost.post("api/type", type)
    return data;
}

export const fetchTypes = async () => {
    const { data } = await $host.get("api/type")
    return data;
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post("api/brand", brand)
    return data;
}

export const fetchBrands = async () => {
    const { data } = await $host.get("api/brand")
    return data;
}

export const createDevice = async (device) => {
    const { data } = await $authHost.post("api/device/", device)
    return data;
}

export const fetchDevices = async (typeId, brandId, page, limit) => {
    const { data } = await $host.get("api/device", {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data;
}

export const fetchDevice = async (id) => {
    const { data } = await $host.get("api/device/" + id)
    return data;
}

export const searchDevices = async (searchTerm) => {
    const { data } = await $host.get("api/search", { params: { searchTerm } });
    return data;
};

export const updateTheDevice = async (id, formData) => {
    const { data } = await $authHost.patch("api/device/" + id, formData)
    return data
}

export const deleteTheDevice = async (id) => {
    const { data } = await $authHost.delete("api/device/" + id)
    return data
}

export const addToBasket = async (basketId, deviceId) => {
    const { data } = await $host.post("api/basket/", { basketId, deviceId });
    return data
}

export const getBasketItems = async (basketId) => {
    const { data } = await $host.get("api/basket/" + basketId)
    return data
}

export const removeItemFromBasket = async (basketId, deviceId) => {
    const { data } = await $host.delete(`api/basket/${basketId}/device/${deviceId}`);
    return data;
};

export const clearBasket = async (basketId) => {
    const { data } = await $host.delete(`api/basket/${basketId}/clear`);
    return data;
};