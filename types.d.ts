type TPost = {
    id: number;
    userId: number;
    title: string;
    body: string;
}

type TUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: Company;
    image: string;
}

type TComment = {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

type Address = {
    geo: Geo;
    stress: string;
    suite: string;
    city: string;
    zipcode: string;
}

type TGeo = {
    lat: string;
    lng: string;
}

type TCompany = {
    name: string;
    catchPhrase: string;
    bs: string;
}

