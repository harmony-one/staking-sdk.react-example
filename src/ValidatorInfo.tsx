import React, { useEffect, useState } from "react";
import { StakingAPI, IValidatorFull, NETWORK_TYPE } from "harmony-staking-sdk";
import { Card, ListGroup } from "react-bootstrap";
import { calculateUniqueDelegators, convertToONE } from "./utils";

const stakingApi = new StakingAPI({
    apiUrl: "https://api.stake.hmny.io",
});

const ValidatorInfo = ({ validatorAddress }: { validatorAddress: string }) => {
    const [validatorInfo, setValidatorInfo] = useState<IValidatorFull | null>(
        null
    );

    useEffect(() => {
        const getValidatorInfo = async () => {
            const validator = await stakingApi.fetchValidatorByAddress(
                NETWORK_TYPE.MAINNET,
                validatorAddress
            );
            setValidatorInfo(validator);
        };
        getValidatorInfo();
    }, [validatorAddress]);

    if (!validatorInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <Card.Img
                variant="top"
                src={stakingApi.getValidatorAvatarUrl(
                    NETWORK_TYPE.MAINNET,
                    validatorInfo.address
                )}
                alt="validator avatar"
            />
            <Card.Body>
                <Card.Title>{validatorInfo.name}</Card.Title>
                <Card.Text>Desciption: {validatorInfo.details}</Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>Address: {validatorInfo.address}</ListGroup.Item>
                <ListGroup.Item>
                    Total Stake: {convertToONE(validatorInfo.total_stake)} ONE
                </ListGroup.Item>
                <ListGroup.Item>
                    Self Stake: {convertToONE(validatorInfo.self_stake)} ONE
                </ListGroup.Item>
                <ListGroup.Item>
                    Total Delegators: {calculateUniqueDelegators(validatorInfo.delegations)}
                </ListGroup.Item>
                <ListGroup.Item>Website: {validatorInfo.website}</ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default ValidatorInfo;
