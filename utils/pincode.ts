type PincodeResult = {
  city: string;
  state: string;
};

export const getCityStateFromPincode = async (
  pincode: string
): Promise<PincodeResult | null> => {
  try {
    const res = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const data = await res.json();

    if (
      data[0].Status !== "Success" ||
      !data[0].PostOffice?.length
    ) {
      return null;
    }

    const postOffice = data[0].PostOffice[0];

    return {
      city: postOffice.District,
      state: postOffice.State,
    };
  } catch {
    return null;
  }
};
