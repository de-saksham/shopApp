export const updateObject = (oldObject: Object, updatedObject: Object) => {
    return {
        ...oldObject,
        ...updatedObject,
    }
};

export async function paginator(items: [], currentPage: number, perPageItems: number) {
    let page = currentPage || 1,
        perPage = perPageItems || items.length,
        offset = (page - 1) * perPage,
        paginatedItems = items.slice(offset).slice(0, perPage),
        totalPages = Math.ceil(items.length / perPage);

    return {
        page: page,
        perPages: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: (totalPages > page) ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
        data: paginatedItems
    };
};
