import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function FormField({ label, error, style, ...props }: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholderTextColor="rgba(255, 255, 255, 0.45)" style={[styles.input, style]} {...props} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: "rgba(255, 255, 255, 0.82)",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    backgroundColor: "rgba(20, 40, 80, 0.8)",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  error: {
    color: "#FF8A80",
    fontSize: 13,
    lineHeight: 18,
  },
});