// next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
// material
import { Box, Button, Container, Typography, Card } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
const ForgetPasswordForm = dynamic(
  () => import("src/components/_main/auth/forgetPasswordForm")
);
import { GuestGuard } from "src/guards";
// api
import * as api from "src/services";
// react query
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const router = useRouter();
  const { t } = useTranslation("forget-password");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setloading] = useState(false);
  const { mutate } = useMutation(api.forgetPassword, {
    onSuccess: (err) => {
      setloading(false);
      toast.success(t("common:resent-email"));
    },
    onError: (err: any) => {
      const message = JSON.stringify(err.response.data.message);
      setloading(false);
      toast.error(
        message ? t(JSON.parse(message)) : t("common:something-wrong")
      );
    },
  });

  return (
    <GuestGuard>
      <Box className="auth-pages">
        <Box className="gradient">
          <Typography
            textAlign="center"
            variant="h3"
            fontWeight={300}
            lineHeight={0.7}
            color="primary.contrastText"
          >
            {t("welcome")}
          </Typography>
          <Typography
            textAlign="center"
            variant="h2"
            color="primary.contrastText"
            className="company-name"
          >
            {t("company")}
          </Typography>
          <Typography
            textAlign="center"
            variant="body1"
            lineHeight={0.9}
            color="primary.contrastText"
          >
            {t("slogan")}
          </Typography>
        </Box>
        <Container>
          <Card className="password-card">
            {!sent ? (
              <>
                <Typography variant="h3" textAlign="center" paragraph>
                  {t("forget-password")}
                </Typography>
                <Typography color="text.secondary" mb={5} textAlign="center">
                  {t("description")}
                </Typography>

                <ForgetPasswordForm
                  onSent={() => setSent(true)}
                  onGetEmail={(value: any) => setEmail(value)}
                  t={t}
                />

                <Button
                  fullWidth
                  size="large"
                  onClick={() => router.push("/auth/login")}
                  className="full-width-btn"
                >
                  {t("back")}
                </Button>
              </>
            ) : (
              <Box textAlign="center">
                {/* <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} /> */}
                <Typography variant="h3" gutterBottom>
                  {t("request-send")}
                </Typography>
                <Typography mb={5}>
                  {t("sent-to")} &nbsp;<strong>{email}</strong>.
                  <br />
                </Typography>
                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                  onClick={() => mutate(email)}
                >
                  {t("resend")}
                </LoadingButton>
                <Button
                  size="large"
                  fullWidth
                  onClick={() => router.push("/auth/login")}
                  className="full-width-btn"
                >
                  {t("back")}
                </Button>
              </Box>
            )}
          </Card>
        </Container>
      </Box>
    </GuestGuard>
  );
}
